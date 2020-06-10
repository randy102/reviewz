export default function (params, name) {
  const { data, context } = params;

  const ids = data[name];
  const objects = context[name];

  return objects.filter(category => ids?.includes(category.id));
}
