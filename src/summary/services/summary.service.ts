import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RequestOptionsDTO } from '../dto/request-options.dto';
import { SummaryReponseDTO } from '../dto/summary-response.dto';

@Injectable()
export class SummaryService {
  constructor(private dataSource: DataSource) {}

  public async getSummary(
    requestOptions: RequestOptionsDTO,
  ): Promise<SummaryReponseDTO> {
    const { processDate, accountId: accountId } = requestOptions;
    return await this.dataSource.query(
      `
        SELECT accounts.id AS id,
              accounts.category AS category,
              chekUsers.nationalId AS nationalId,
              accounts.ownerType AS ownerType,
              (firstBalance.remainingBalance - firstBalance.balanceVariation) AS firstBalance,
              lastBalance.remainingBalance AS lastBalance,
              totalDeposits.amount AS totalDeposits,
              totalWithdraws.amount AS totalWithdraws,
              totalRefunds.amount AS totalRefunds
        FROM chek_transactions_db.accounts
        LEFT JOIN chek_transactions_db.chekUsers ON accounts.ownerId = chekUsers.id
        LEFT JOIN chek_transactions_db.movements firstBalance 
          ON firstBalance.accountId = accounts.id 
            AND firstBalance.createdAt = (
                SELECT MIN(m1.createdAt) FROM chek_transactions_db.movements m1
                WHERE m1.accountId = accounts.id
                AND YEAR(m1.createdAt) = YEAR(?) 
                AND MONTH(m1.createdAt) = (MONTH(?)) 
                AND reversed = 0
              )
        LEFT JOIN chek_transactions_db.movements lastBalance 
          ON lastBalance.accountId = accounts.id 
            AND lastBalance.createdAt = (SELECT MAX(m2.createdAt) FROM chek_transactions_db.movements m2
            WHERE m2.accountId = accounts.id
            AND YEAR(m2.createdAt) = YEAR(?)
            AND MONTH(m2.createdAt) = (MONTH(?))
            AND reversed = 0)
        LEFT JOIN (SELECT toAccountId, SUM(amount) AS amount FROM chek_transactions_db.deposits
          WHERE YEAR(deposits.createdAt) = YEAR(?) 
          AND MONTH(deposits.createdAt) = (MONTH(?))
          AND reversed = 0
          GROUP BY toAccountId) totalDeposits 
          ON totalDeposits.toAccountId = accounts.id
        
        LEFT JOIN (SELECT toAccountId, SUM(amount) AS amount FROM chek_transactions_db.refunds
          WHERE YEAR(refunds.createdAt) = YEAR(?) 
          AND MONTH(refunds.createdAt) = (MONTH(?))
          AND reversed = 0
          GROUP BY toAccountId) totalRefunds 
          ON totalRefunds.toAccountId = accounts.id
        LEFT JOIN (SELECT fromAccountId, SUM(amount) AS amount FROM chek_transactions_db.withdraws
          WHERE YEAR(withdraws.createdAt) = YEAR(?) 
          AND MONTH(withdraws.createdAt) = (MONTH(?))
          AND reversed = 0
          GROUP BY fromAccountId) totalWithdraws 
          ON totalWithdraws.fromAccountId = accounts.id
        WHERE accounts.id = ? LIMIT 1
      `,
      [
        processDate,
        processDate,
        processDate,
        processDate,
        processDate,
        processDate,
        processDate,
        processDate,
        processDate,
        processDate,
        accountId,
      ],
    );
  }
}
