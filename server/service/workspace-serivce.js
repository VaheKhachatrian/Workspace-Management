import workspacesModel from "../models/workspaces-model.js";
import userService from "./user-service.js";
import { Types } from "mongoose";

class WorkspacesService {
  async getAllWorkspaces() {
    return await workspacesModel.find({});
  }

  async createWorkspace(name, userId, slug) {
    await userService.getUserById(userId);

    const candidate = await workspacesModel.findOne({ slug });
    if (candidate) {
      throw new Error("Workspace with this slug already exists");
    }

    const workspace = new workspacesModel({ name, userId, slug });
    return await workspace.save();
  }

  async checkWorkspaceAvailability(slug) {
    const workspace = await workspacesModel.findOne({ slug });

    if (workspace) {
      const variants = await this.generateSlugVariants(slug);
      return {
        variants,
        isFree: false,
      };
    }

    return {
      variants: [],
      isFree: true,
    };
  }

  async generateSlugVariants(slug) {
    const variants = [];
    let index = 1;

    while (variants.length < 5) {
      const newSlug = `${slug}${index}`;
      const existing = await workspacesModel.findOne({ slug: newSlug });

      if (!existing) {
        variants.push(newSlug);
      }

      index++;
    }

    return variants;
  }

  async getWorkspacesByUserId(userId) {
    return await workspacesModel.find({ userId });
  }

  async getWorkspaceById(id) {
    try {
      const workspace = await workspacesModel.findById(id);
      if (!workspace) {
        throw new Error("Workspace not found");
      }

      return workspace;
    } catch (error) {
      throw new Error("Workspace not found");
    }
  }

  async deleteWorkspaceById(userId, id) {
    const workspaceId = new Types.ObjectId(id);
    const workspace = await this.getWorkspaceById(workspaceId);

    if (workspace.userId.toString() !== userId.toString()) {
      throw new Error("You are not the owner of this workspace");
    }

    return await workspacesModel.findByIdAndDelete(workspaceId);
  }
}

export default new WorkspacesService();
