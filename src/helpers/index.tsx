export * from './getCsrfToken';
export * from './CountryISO';
export * from './sliceArray';

export const changeWebsiteTitle = (titleParts: string[], delimiter: string = " | ") => {
    // Join the parts and set the document's title
    document.title = titleParts.filter(Boolean).join(delimiter);
};
  