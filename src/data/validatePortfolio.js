const assertUniqueIds = (items, scope) => {
  const ids = new Set();

  items.forEach(({ id }) => {
    if (!id) {
      throw new Error(`Portfolio data: ${scope} contains an item without an id.`);
    }
    if (ids.has(id)) {
      throw new Error(`Portfolio data: duplicate id "${id}" in ${scope}.`);
    }
    ids.add(id);
  });
};

export const validatePortfolio = data => {
  if (!data.site?.name || !data.site?.tagline) {
    throw new Error('Portfolio data: site.name and site.tagline are required.');
  }

  assertUniqueIds(data.skillGroups, 'skillGroups');
  assertUniqueIds(data.skillGroups.flatMap(group => group.items), 'skills');
  assertUniqueIds(data.career, 'career');
  assertUniqueIds(data.projects, 'projects');
  assertUniqueIds(data.contact.actions, 'contact.actions');

  data.projects.forEach(project => {
    if (!project.href && !project.status) {
      throw new Error(
        `Portfolio data: project "${project.id}" requires href or status.`
      );
    }
  });

  return data;
};
