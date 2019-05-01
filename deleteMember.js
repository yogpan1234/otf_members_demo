const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = async (event) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            var params = {
                Key: {
                    phone: event.phone
                }, 
                TableName: 'members'
            };

            docClient.delete(params, (err, data) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve({ 
                        statusCode: 200,
                        body: 'Member deleted'
                    })
                }
            });
        } catch(err) {
            console.error(err);
            reject(err)
        }
    });
};

