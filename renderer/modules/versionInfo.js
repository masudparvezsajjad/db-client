const showVersion = () => {
  const versionInfo = window.dbClient?.versions;
  if (!versionInfo) {
    return;
  }

  const footer = document.createElement("div");
  footer.className = "version-info";
  footer.textContent = `Electron ${versionInfo.electron} · Chrome ${versionInfo.chrome}`;
  document.body.appendChild(footer);
};

export default showVersion;
