import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidV4 } from 'uuid';

import { document } from '../utils/dynamodbClient'

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body);

  await document.put({
    TableName: 'users_todos',
    Item: {
      id: uuidV4(),
      user_id,
      title,
      done: false,
      deadline: new Date(deadline).toISOString()
    },
    ReturnValues: 'ALL_OLD',
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Created!',
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}