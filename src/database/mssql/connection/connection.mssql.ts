import { AppConfigService } from 'src/config/appconfig.service';
import { SequelizeModule } from '@nestjs/sequelize';
 
export const DatabaseConnection = SequelizeModule.forRootAsync({
  imports: [],
  inject: [AppConfigService],
  useFactory: (appConfigService: AppConfigService) => ({
    dialect: 'mssql',
    dialectModule: require('tedious'),
    host: appConfigService.envConfig.db.host,  
    port: appConfigService.envConfig.db.port,  
    username: appConfigService.envConfig.db.username,  
    password: appConfigService.envConfig.db.password,  
    database: appConfigService.envConfig.db.database,  
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
      authentication: {
        type: 'ntlm',
        options: {
          domain: appConfigService.envConfig.db.domain,  
          userName: appConfigService.envConfig.db.username,  
          password: appConfigService.envConfig.db.password,
        },
      },
    },
    autoLoadModels: true,
    synchronize: true,
  }),
});
 
 