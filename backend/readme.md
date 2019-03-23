First lesson  of creating a login system 

1. Updated the schema with new user fields and redeployed
2. Add middle wear to handle cookies using express and cookie parser
3. Update schema with sign up mutation
3. Create a sign up resolver hashing the password, lower casing the email
4. When the account has been created assign the user a jtw token to log them in straight away and
   save that to the cookie
