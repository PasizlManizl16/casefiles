import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const isoSrc = path.join(root, "public/assets/_downloads/kenney_furniture/Isometric");
const outDir = path.join(root, "public/assets/office/iso");

const ISO_MAP = [
  ["desk_SE.png", "desk.webp"],
  ["deskCorner_SE.png", "desk-corner.webp"],
  ["computerScreen_SE.png", "monitor.webp"],
  ["computerKeyboard_SE.png", "keyboard.webp"],
  ["computerMouse_SE.png", "mouse.webp"],
  ["lampRoundTable_SE.png", "lamp.webp"],
  ["wallWindow_SE.png", "window.webp"],
  ["bookcaseClosedWide_SE.png", "evidence-board.webp"],
  ["bookcaseOpen_SE.png", "bookcase-open.webp"],
  ["books_SE.png", "books.webp"],
  ["cardboardBoxClosed_SE.png", "folder.webp"],
  ["cardboardBoxOpen_SE.png", "folder-open.webp"],
  ["tableCoffee_SE.png", "coffee.webp"],
  ["chairDesk_SE.png", "chair.webp"],
  ["rugSquare_SE.png", "rug.webp"],
  ["plantSmall1_SE.png", "plant.webp"],
  ["laptop_SE.png", "phone.webp"],
  ["sideTableDrawers_SE.png", "side-table.webp"],
  ["coatRackStanding_SE.png", "coat-rack.webp"],
];

fs.mkdirSync(outDir, { recursive: true });

const bgSrc = path.join(root, "public/assets/_downloads/kenney_furniture/Sample_HD.png");
if (fs.existsSync(bgSrc)) {
  await sharp(bgSrc)
    .resize(1920, 1080, { fit: "cover", position: "right" })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, "room-bg.webp"));
  console.log("room-bg.webp");
}

for (const [srcName, outName] of ISO_MAP) {
  const srcPath = path.join(isoSrc, srcName);
  if (!fs.existsSync(srcPath)) {
    console.warn("skip missing:", srcName);
    continue;
  }
  await sharp(srcPath).webp({ quality: 85, effort: 4 }).toFile(path.join(outDir, outName));
  console.log(outName);
}

console.log("Done — isometric WebP assets built.");
