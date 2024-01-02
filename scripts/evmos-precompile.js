const fs = require("fs-extra");

const sourceDir = "/Volumes/Data/Dev/go/src/github.com/evmos/evmos/precompiles";
const destinationDir = "/Volumes/Data/Code/evmos-precompile/contracts";

// 递归遍历原始目录并拷贝满足条件的文件
async function copyFiles(source, destination) {
  try {
    const files = await fs.readdir(source);

    for (const file of files) {
      const filePath = `${source}/${file}`;
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        // 如果是目录，则递归调用 copyFiles 处理子目录
        await copyFiles(filePath, `${destination}/${file}`);
      } else if (file.endsWith(".sol") || file.endsWith(".json")) {
        // 如果是以 .sol 或 .json 结尾的文件，则拷贝到目标目录
        await fs.copy(filePath, `${destination}/${file}`);
      }
    }
  } catch (err) {
    console.error("拷贝文件时出错：", err);
  }
}

// 调用函数开始拷贝
if (false) {
  copyFiles(destinationDir, sourceDir);
} else {
  copyFiles(sourceDir, destinationDir);
}
