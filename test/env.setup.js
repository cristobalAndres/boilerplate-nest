/*
 * This file should contain any environment variables
 * that are explicitly required in the ConfigModule
 *
 * Example:
 * process.env.SOME_REQUIRED_ENV_VAR = 'some custom value'
 *
 * By doing this, we can produce an error when launching the service
 * if the variable is not set, and avoid that error when testing it.
 */
process.env.NODE_ENV = 'test';
process.env.URL_SENDGRID_AMBASSADOR = 'http://localhost:8080/url';
process.env.FROM_EMAIL_SENDGRID = 'no-reply-test@check.ts';
