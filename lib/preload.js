;(() => {
  const windowsPatch = (w) => {
    w.chrome = {
      app: {
        isInstalled: false,
        InstallState: {
          DISABLED: "disabled",
          INSTALLED: "installed",
          NOT_INSTALLED: "not_installed",
        },
        RunningState: {
          CANNOT_RUN: "cannot_run",
          READY_TO_RUN: "ready_to_run",
          RUNNING: "running",
        },
      },
      loadTimes: () => {},
      csi: () => {},
    }
    w.console.debug = () => {}
    w.console.log = () => {}
    w.console.context = () => {}
    w.navigator.permissions.query = new Proxy(navigator.permissions.query, {
      apply: async function (target, thisArg, args) {
        try {
          const result = await Reflect.apply(target, thisArg, args)
          if (result?.state === "prompt") {
            Object.defineProperty(result, "state", { value: "denied" })
          }
          return Promise.resolve(result)
        } catch (error) {
          return Promise.reject(error)
        }
      },
    })
    Element.prototype._addEventListener = Element.prototype.addEventListener
    Element.prototype.addEventListener = function () {
      let args = [...arguments]
      let temp = args[1]
      args[1] = function () {
        let args2 = [...arguments]
        args2[0] = Object.assign({}, args2[0])
        args2[0].isTrusted = true
        return temp(...args2)
      }
      return this._addEventListener(...args)
    }
  }
  const cloudflareClicker = (w) => {
    if (w?.document && w.location.host === "challenges.cloudflare.com") {
      const targetSelector = "input[type=checkbox]"
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            const addedNodes = Array.from(mutation.addedNodes)
            for (const addedNode of addedNodes) {
              if (addedNode.nodeType === addedNode.ELEMENT_NODE) {
                const node = addedNode?.querySelector(targetSelector)
                if (node) {
                  node.parentElement.click()
                }
              }
            }
          }
        }
      })

      const observerOptions = {
        childList: true,
        subtree: true,
      }
      observer.observe(
        w.document.documentElement || w.document,
        observerOptions
      )
    }
  }
  windowsPatch(window)
  cloudflareClicker(window)
})()
