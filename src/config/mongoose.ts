import mongoose from 'mongoose';
import logging from './logging';
const NAMESPACE = 'DATABASE';

type TInput = {
  dbUri: string;
}

const connect = async (input: TInput) => {
    const { dbUri } = input;
  
    try {
      await mongoose.connect(dbUri);
      logging.info(NAMESPACE, `Successfully connected to ${dbUri}`)
    } catch (error) {
        logging.error(NAMESPACE, `Failed to connect to MongoDB: ${error}`)
    }
  };
  
  export default connect;