const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = async (event) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            var params = {
                Limit: 100, 
                TableName: 'members'
            };

            docClient.scan(params, (err, data) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve({ 
                        statusCode: 200,
                        body: data
                    })
                }
            });
        } catch(err) {
            console.error(err);
            reject(err)
        }
    });
};

