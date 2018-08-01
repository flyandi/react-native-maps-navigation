# `<MapViewNavigation />` Component API

`MapViewNavigation` is the primary component in react-native-maps-navigation that contains the navigation manager.

## Props

| Prop | Type | Default | Note |
|---|---|---|---|
| `apiKey` | `string` | (Required) | A Google API key that has the Direction API enabled. See below for more  information.
| `language` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `map` | `function` | | A function that is called to obtain the map instances.
| `origin` | `any` | | A string or object that identifies the origin
| `destination` | `any` | | A string or object that identifies the destination
| `maxZoom` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `minZoom` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `animationDuration` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `navigationMode` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `navigationViewingAngle` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `navigationZoomLevel` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `directionZoomQuantifier` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `routeStepDistance` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `routeStepInnerTolerance` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `routeStepCenterTolerance` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `routeStepCourseTolerance` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.
| `displayDebugMarkers` | `string` | | A language identifier passed to various submodules. This is useful to show directions in the specific countries language.

## Events

| Prop | Type | Default | Note |
|---|---|---|---|
| `provider` | `string` |  | The map framework to use. <br/><br/>Either `"google"` for GoogleMaps, otherwise `null` or `undefined` to use the native map framework (`MapKit` in iOS and `GoogleMaps` in android).



## Methods

| Method Name | Arguments | Notes
|---|---|---|
| `navigateRoute` | `location: LatLng`, `bearing: Number`, `angle: Number`, `duration: Number` | Navigates the route