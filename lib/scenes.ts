export type SceneId =
  | "desk"
  | "monitor"
  | "phone"
  | "folder"
  | "evidence-board"
  | "notebook";

export const SCENES = {
  DESK: "desk",
  MONITOR: "monitor",
  PHONE: "phone",
  FOLDER: "folder",
  EVIDENCE_BOARD: "evidence-board",
  NOTEBOOK: "notebook",
} as const satisfies Record<string, SceneId>;

export const SCENE_LABELS: Record<Exclude<SceneId, "desk">, string> = {
  monitor: "Computer Monitor",
  phone: "Smartphone",
  folder: "Investigation Folder",
  "evidence-board": "Evidence Board",
  notebook: "Investigator Notebook",
};

export function isOverlayScene(scene: SceneId): scene is Exclude<SceneId, "desk"> {
  return scene !== "desk";
}
