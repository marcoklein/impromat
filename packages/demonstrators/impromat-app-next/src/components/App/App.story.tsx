import { LibraryPage } from '../LibraryPage/LibraryPage';
import LibraryPageStory from '../LibraryPage/LibraryPage.story';
import { App } from './App';

export default {
  // title: 'MainMenu',
};

export const Usage = () => (
  <App>
    <LibraryPage {...(LibraryPageStory.args as any)} />
  </App>
);
