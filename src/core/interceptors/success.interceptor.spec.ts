import { Logger } from '@nestjs/common';
import { SuccessInterceptor } from './success.interceptor';

describe('SuccessInterceptor', () => {
  it('should be defined', () => {
    expect(new SuccessInterceptor(new Logger())).toBeDefined();
  });
});
