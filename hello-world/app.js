// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);

        const {Client} = require('pg');

        //const body = JSON.parse(event.body)      ;
        /*
        const query = {

                text:"insert into operations_observations (report_id)",
                values: [body.text],
        };
         */
        const query = "insert into models.operations_observations (report_id, manufacturing_order, observation_disposition) values ('1','test', 'observed bs')";

        const client = new Client({
            user:'postgres',
            host:'prd-postgres-cluster.cluster-cn1bn6utijsz.us-east-2.rds.amazonaws.com',
            database:'postgres',
            password:'yhZxDziKK4ilQINdW3I3',
            port:'5432',
        })
       client.connect();

        const result = await client.query(query);
        const result_string = JSON.stringify(result);

        client.end;
        
        response = {
            'statusCode': 200,
            'body': result_string,

            /*
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            */
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;

};
