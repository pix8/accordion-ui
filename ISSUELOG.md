# Known Issues Log


## v0.0.0-alpha
- Reinforced react module as a 'dependency' in addition to a 'peer-dependency'; react is not being picked up as a peer dependency when the module is run and will break project-level compilation with a Module not found error: Can't resolve react(even if react is declared at project-level). This is a temporary measure until further tests are conducted and a cause can be assertained. Incidentally, does not occur with vue which is also defined as a peer dependency. UPDATE: issue is related to react-scripts@2.x. Downgrading to ^1.x clears the issue. Fix has been amended to regress 'react-scripts' to @1.1.5(latest v.1 release). At first glance, seems to be related to an [open issue](https://github.com/facebook/create-react-app/issues/3883).
