import { Schema, model } from "mongoose";

const WorkspaceSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  slug: { type: String, required: true, unique: true },
});

export default model("Workspaces", WorkspaceSchema);
