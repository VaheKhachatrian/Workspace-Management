import workspaceService from "../service/workspace-serivce.js";

class WorkspaceController {
  async create(req, res) {
    try {
      const { name, slug } = req.body;
      const userId = req.user.id;

      if (!name || !slug) {
        return res.status(400).json({ message: "Name or slug not provided" });
      }

      
      const workspace = await workspaceService.createWorkspace(
        name,
        userId,
        slug
      );
      return res.status(201).json(workspace);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async check(req, res) {
    try {
      const { slug } = req.query;

      if (!slug) {
        return res.status(400).json({ message: "Slug not provided" });
      }

      const result = await workspaceService.checkWorkspaceAvailability(slug);
      return res.json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async get(req, res) {
    try {
      const userId = req.user.id;
      const workspaces = await workspaceService.getWorkspacesByUserId(userId);
      return res.json(workspaces);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async delete(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Workspace ID not provided" });
      }

      const deletedWorkspace = await workspaceService.deleteWorkspaceById(
        userId,
        id
      );
      return res.json({
        message: "Workspace deleted successfully",
        deletedWorkspace,
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new WorkspaceController();
