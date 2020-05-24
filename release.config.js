const commitOptions = {
  preset: 'conventionalcommits',
  releaseRules: [
    // Import default rules
    ...require('@semantic-release/commit-analyzer/lib/default-release-rules'),
    { type: 'chore', scope: 'deps', release: 'patch' },
  ],
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
  },
};

module.exports = {
  plugins: [
    ['@semantic-release/commit-analyzer', commitOptions],
    [
      '@semantic-release/release-notes-generator',
      {
        ...commitOptions,
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
      },
    ],
    ['@semantic-release/changelog', {}],
    ['@semantic-release/github', {}],
    ['@semantic-release/npm', {}],
    ['@semantic-release/git', {}],
  ],
};
