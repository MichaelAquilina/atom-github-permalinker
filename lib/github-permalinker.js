'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-github-permalinker:copy-link': () => this.generate_permalink()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },

  generate_permalink() {
    let editor = atom.workspace.getActiveTextEditor();
    let line = editor.getCursorBufferPosition().row + 1;
    let current_path = editor.getPath();
    let repos = atom.project.getRepositories();

    if (repos.length != 1) {
      atom.notifications.addWarning("Only supports 1 repo");
      return;
    }

    let target_repo = repos[0];
    let file_path = target_repo.relativize(current_path);
    let short_head = target_repo.getShortHead();
    let origin = target_repo.getOriginURL().split('@')[1];
    let origin_tokens = origin.split(':');
    let origin_domain = origin_tokens[0];
    let origin_path = origin_tokens[1].replace('.git', '');
    let permalink = `https://${origin_domain}/${origin_path}/blob/${short_head}/${file_path}#L${line}`;

    atom.clipboard.write(permalink);
    atom.notifications.addInfo("Copied Github permalink to clipboard");
  }
};
