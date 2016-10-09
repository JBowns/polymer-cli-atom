'use babel';

import PolymerCliAtomView from './polymer-cli-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  polymerCliAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.polymerCliAtomView = new PolymerCliAtomView(state.polymerCliAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.polymerCliAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'polymer-cli-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.polymerCliAtomView.destroy();
  },

  serialize() {
    return {
      polymerCliAtomViewState: this.polymerCliAtomView.serialize()
    };
  },

  toggle() {
    console.log('PolymerCliAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
