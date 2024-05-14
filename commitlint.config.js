module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'ci',
        'build',
        'release',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      ['root', 'auth', 'products', 'users', 'dashboard', 'gateway', 'k8s'],
    ],
    'header-max-length': [2, 'always', 100],
    'header-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', ['lower-case', 'sentence-case']],
    'subject-full-stop': [2, 'never', ['.']],
    'subject-empty': [2, 'never'],
  },
};
