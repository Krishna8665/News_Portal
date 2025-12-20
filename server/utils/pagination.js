module.exports = async function paginate(model, query, options = {}) {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 5;
  const skip = (page - 1) * limit;
  const sort = options.sort || { createdAt: -1 };
  const populate = options.populate || "";

  const [data, total] = await Promise.all([
    model.find(query).populate(populate).sort(sort).skip(skip).limit(limit),
    model.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};
