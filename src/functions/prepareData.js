export function prepareData(data, image, background) {
  let objectData = {};
  if (image.length !== 0) {
    objectData = { ...objectData, image };
  }
  if (background.length !== 0) {
    objectData = { ...objectData, background };
  }
  if (data.name.length !== 0) {
    const name = data.name;
    objectData = { ...objectData, name };
  }
  if (data.description.length !== 0) {
    const description = data.description;
    objectData = { ...objectData, description };
  }
  if (data.links.length !== 0) {
    const links = data.links;
    objectData = { ...objectData, links };
  }
  if (data.options.length !== 0) {
    const options = data.options;
    objectData = { ...objectData, options };
  }

  return objectData;
}
