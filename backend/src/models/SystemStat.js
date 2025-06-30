import mongoose from "mongoose";

const SystemStatSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

SystemStatSchema.statics.increment = async function (key) {
  return this.findOneAndUpdate(
    { key },
    { $inc: { value: 1 } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

SystemStatSchema.statics.get = async function (key, defaultValue = 0) {
    const stat = await this.findOne({ key });
    return stat ? stat.value : defaultValue;
}


const SystemStat = mongoose.model("SystemStat", SystemStatSchema);

SystemStat.on('error', (err) => {
  console.error('Mongoose SystemStat Error:', err);
});

export default SystemStat; 