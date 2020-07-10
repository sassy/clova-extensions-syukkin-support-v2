import * as cdk from '@aws-cdk/core';
import { Function, Runtime, Code} from "@aws-cdk/aws-lambda";
import { RestApi, LambdaIntegration, Resource, Integration } from "@aws-cdk/aws-apigateway";
import { Role, ServicePrincipal, ManagedPolicy } from "@aws-cdk/aws-iam";

export class ClovaExtensionsSyukkinSupportStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const executionLambdaRole = new Role(this, 'secureLambdarole', {
      roleName: 'lambdaSecureExecutionRole',
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ]
    });

    const lambdaFunction: Function = new Function(this, "syukkinSupportHandler", {
      functionName: "syukkinSupportHandler",
      runtime: Runtime.NODEJS_12_X,
      code: Code.asset("lambda"),
      handler: "main.handler",
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      role: executionLambdaRole,
      environment: {
        TZ: "Asia/Tokyo",
        APPLICATION_ID: "io.sassy.github.syukkinsupport"
      }
    });

    const restApi: RestApi = new RestApi(this, "mySyukkin-API", {
      restApiName: "mySyukkin-API",
      description: "API"
    });

    const integration: Integration = new LambdaIntegration(lambdaFunction);
    const getResourse: Resource = restApi.root.addResource("mySyukkin");
    getResourse.addMethod("POST", integration);

  }
}
