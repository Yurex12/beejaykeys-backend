import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(connect.connection.host, connect.connection.name);
  } catch (error: any) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}
