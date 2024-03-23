import { Container } from 'inversify';
import { flow } from 'lodash';
import databseModule from '../module/database/databse.module';

import authModule from '../../../auth/infrastructure/module/auth.module';

import jwtModule from '../module/jwt/jwt.module';
import environmentModule from '../module/enrironment/enrironment.module';

import servicesModule from '../module/services/services.module';
import roomModule from '../../../room/infrastructure/module/room.module';
import meetingModule from '../../../meetings/infrastructure/module/meeting.module';
import sessionModule from '../../../session/infrastructure/module/session.module';

const container = flow(
  databseModule,
  authModule,
  jwtModule,
  environmentModule,
  servicesModule,
  roomModule,
  meetingModule,
  sessionModule
)(new Container());

export default container;
