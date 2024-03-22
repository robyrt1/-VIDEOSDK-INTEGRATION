import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import cors from 'cors';
import container from './shared/infrastructure/inversify/inversify';
import './shared/infrastructure/routes/index';
import { map } from 'lodash';
import { GenericExceptionFilter } from './shared/application/filters/generic.exception.filter';

const app = new InversifyExpressServer(container, null, null, express());

app.setConfig((app) => {
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
});

app.setErrorConfig((app) => {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const genericExceptionFilter = container.resolve(GenericExceptionFilter);
    genericExceptionFilter.handleError(err, req, res, next);
  });
});

const server = app.build();
const portServer = Number(process.env.PORT);
const routeInfo = getRouteInfo(container);

map(routeInfo, (enpoints) => {
  const nameController = enpoints.controller;
  map(enpoints.endpoints, (endpoint) => {
    console.log(`\x1b[34mAPI-ZOOM LOG [RouterExplorer] - ${nameController} - {${endpoint.route}}\x1b[0m`);
  });
});

const serverRun = server.listen(portServer, () => {
  const address: any = serverRun.address();
  console.log(`[INFO] - Server connection: http://${address.address}:${address.port}`);
});
