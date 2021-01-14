function resizeFontsize() {
  const width = document.documentElement.clientWidth;
  document.documentElement.style.fontSize = width / 14 + "px";
  //width/(效果图片宽度/文本字体大小(100))
}
resizeFontsize();
window.addEventListener("resize", resizeFontsize);
