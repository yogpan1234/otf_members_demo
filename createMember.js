const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const querystring = require('querystring');

exports.handler = async (event) => {
    return new Promise( async (resolve, reject) => {
        try {

            if (event !== null && event !== undefined) {
                
                var params = {
                    Item: event, 
                    TableName: 'members',
                    ConditionExpression: 'attribute_not_exists(phone)'
                };
    
                docClient.put(params, (err, data) => {
                    if(err) {
                        reject('Member creation failed, check if member already exists!')
                    }
                    else {
                        resolve({ 
                            statusCode: 200,
                            body: 'Member created!'
                        })
                    }
                });
            } else {
                resolve({ 
                            statusCode: -1,
                            body: 'no data was provided'
                        })
            }
        } catch(err) {
            console.error(err);
            reject(err)
        }
    });
};

