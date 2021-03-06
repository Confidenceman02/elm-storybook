import { storiesOf } from "@storybook/react"
import * as React from "react"

const ElmComponent = require("react-elm-components")

/**
Load a `*.elm` file that uses ElmStorybook, adding the stories to react-storybook

@param name The name of this collection of stories. eg. `"Text (Elm)"`
@param module Use the value `module`. This is required for Hot Module Reloading. eg. `module`
@param elmApp The Elm file you wish to import. eg. `require('./TextStores.elm')`
@param storyNames An array of stories to add to this collection. These names must match those defined in the Elm Storybook. eg. `['h1', 'h2', 'h3']`

```js
import { loadElmStories } from "@cultureamp/elm-storybook"

loadElmStories("Text (Elm)", module, require("./TextStories.elm"), [
  "h1",
  "h2",
  "h3"
])
```
*/
export const loadElmStories = (
  name: string,
  module: NodeModule,
  elmApp: { Elm: { Main: any } },
  storyNames: string[]
) => {
  if (!elmApp.Elm.Main) {
    throw new Error("Elm storybook module did not exist with name `Main`")
  }
  const stories = storiesOf(name, module)
  for (const storyName of storyNames) {
    stories.add(storyName, () => (
      <ElmComponent src={elmApp.Elm.Main} flags={storyName} />
    ))
  }
}
