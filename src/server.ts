import { App } from '@/app';

import { UserRoute } from '@/modules/user/infra/http/UserRoute';

import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new UserRoute()]);

app.listen();
