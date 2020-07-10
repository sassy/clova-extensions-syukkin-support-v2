#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ClovaExtensionsSyukkinSupportStack } from '../lib/clova-extensions-syukkin-support-stack';

const app = new cdk.App();
new ClovaExtensionsSyukkinSupportStack(app, 'ClovaExtensionsSyukkinSupportStack');
app.synth()