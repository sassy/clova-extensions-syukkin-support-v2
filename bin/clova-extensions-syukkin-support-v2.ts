#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ClovaExtensionsSyukkinSupportV2Stack } from '../lib/clova-extensions-syukkin-support-v2-stack';

const app = new cdk.App();
new ClovaExtensionsSyukkinSupportV2Stack(app, 'ClovaExtensionsSyukkinSupportV2Stack');
