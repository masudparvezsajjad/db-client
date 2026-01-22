const DEFAULT_QUERY = `SELECT *
FROM events
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;`;

const createTabId = () =>
  `tab-${Math.random().toString(36).slice(2, 9)}`;

const highlightSql = (codeElement, text) => {
  if (!codeElement) {
    return;
  }

  codeElement.textContent = text;
  if (window.hljs) {
    window.hljs.highlightElement(codeElement);
  }
};

const syncScroll = (inputElement, highlightElement) => {
  if (!inputElement || !highlightElement) {
    return;
  }

  highlightElement.scrollTop = inputElement.scrollTop;
  highlightElement.scrollLeft = inputElement.scrollLeft;
};

const initQueryTabs = () => {
  const tabList = document.getElementById("query-tabs");
  const newTabButton = document.getElementById("new-query-tab");
  const input = document.getElementById("query-input");
  const code = document.getElementById("query-highlight-code");
  const highlightContainer = code?.parentElement;

  if (!tabList || !newTabButton || !input || !code) {
    return;
  }

  const state = {
    tabs: [],
    activeTabId: null,
  };

  const getActiveTab = () =>
    state.tabs.find((tab) => tab.id === state.activeTabId);

  const renderTabs = () => {
    tabList.innerHTML = "";
    state.tabs.forEach((tab, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `tab-button${
        tab.id === state.activeTabId ? " is-active" : ""
      }`;
      button.textContent = tab.title || `Query ${index + 1}`;
      button.dataset.tabId = tab.id;
      button.addEventListener("click", () => setActiveTab(tab.id));
      tabList.appendChild(button);
    });
  };

  const setActiveTab = (tabId) => {
    const tab = state.tabs.find((item) => item.id === tabId);
    if (!tab) {
      return;
    }

    state.activeTabId = tabId;
    input.value = tab.query;
    highlightSql(code, tab.query);
    renderTabs();
    syncScroll(input, highlightContainer);
    input.focus();
  };

  const addTab = (query = DEFAULT_QUERY) => {
    const id = createTabId();
    state.tabs.push({
      id,
      title: `Query ${state.tabs.length + 1}`,
      query,
    });
    setActiveTab(id);
  };

  newTabButton.addEventListener("click", () => addTab(""));

  input.addEventListener("input", () => {
    const activeTab = getActiveTab();
    if (!activeTab) {
      return;
    }
    activeTab.query = input.value;
    highlightSql(code, activeTab.query);
  });

  input.addEventListener("scroll", () =>
    syncScroll(input, highlightContainer),
  );

  input.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const start = input.selectionStart;
      const end = input.selectionEnd;
      input.value = `${input.value.slice(0, start)}  ${input.value.slice(end)}`;
      input.selectionStart = input.selectionEnd = start + 2;
      input.dispatchEvent(new Event("input"));
    }
  });

  addTab(DEFAULT_QUERY);
};

export default initQueryTabs;
