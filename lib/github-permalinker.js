'use babel';

import AtomGithubPermalinkerView from './atom-github-permalinker-view';
import { CompositeDisposable } from 'atom';

export default {

  atomGithubPermalinkerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomGithubPermalinkerView = new AtomGithubPermalinkerView(state.atomGithubPermalinkerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomGithubPermalinkerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-github-permalinker:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomGithubPermalinkerView.destroy();
  },

  serialize() {
    return {
      atomGithubPermalinkerViewState: this.atomGithubPermalinkerView.serialize()
    };
  },

  toggle() {
    console.log('AtomGithubPermalinker was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
