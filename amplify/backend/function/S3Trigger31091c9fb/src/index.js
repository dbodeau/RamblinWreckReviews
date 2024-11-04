const AWS = require('aws-sdk');
const csv = require('csv-parser');
const s3 = new AWS.S3();
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: 'us-east-2',
});

exports.handler = async function (event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  try {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    const data = await s3.getObject(params).promise();
    const stream = data.Body.pipe(csv());

    stream.on('data', async (row) => {
      const name = row.name; // Assuming the CSV has a "name" column
      const email = row.email; // Assuming the CSV has an "email" column
      const password = 'Password1$'; // Custom temporary password

      const userPoolParams = {
        UserPoolId: 'us-east-2_aINgPxAHU', // Replace with your Cognito User Pool ID
        Username: email,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            Name: 'name',
            Value: name,
          },
        ],
        TemporaryPassword: password,
        MessageAction: 'SUPPRESS',
      };

      try {
        const response = await cognitoIdentityServiceProvider
          .adminCreateUser(userPoolParams)
          .promise();
        console.log(`User created: ${response.User.Username}`);
      } catch (err) {
        console.error(`Error creating user ${email}: ${err}`);
      }
    });

    stream.on('end', () => {
      console.log('CSV parsing complete');
    });
  } catch (err) {
    console.error('Error:', err);
  }
};