import {createConnection} from "typeorm";
import {Account} from "./entity/Account";

// connection settings are in the "ormconfig.json" file
createConnection().then(async connection => {
  const accountsRepository = connection.getRepository(Account);
  const account = accountsRepository.create({name: 'test'});
  await accountsRepository.save(account);
  const result = await accountsRepository.findOne(account.id, {relations: ['members']});
  await connection.close();
}).catch(error => console.log("Error: ", error));
