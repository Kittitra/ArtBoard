// extensions/SceneHeading.ts
import { Node, mergeAttributes } from "@tiptap/core";

export const SceneHeading = Node.create({
  name: "sceneHeading",
  group: "block",
  content: "inline*",

  parseHTML() {
    return [{ tag: 'div[data-type="scene-heading"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "scene-heading" }),
      0,
    ];
  },
});