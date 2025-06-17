export function invokeAfterDelay(callback: () => void): void {
    setTimeout(() => {
      callback();
    }, 1000);
  }
  
  interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
  }
  
  export function getPosts(urls: string[]): Promise<Post[]> {
    if (urls.length === 0) {
      return Promise.resolve([]);
    }
  
    return Promise.all(
      urls.map(url => 
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (isPost(data)) {
              return data;
            }
            throw new Error('Invalid post data structure');
          })
      )
    );
  }
  
  function isPost(data: unknown): data is Post {
    if (typeof data !== 'object' || data === null) {
      return false;
    }
    
    const post = data as Record<string, unknown>;
    return (
      typeof post.body === 'string' &&
      typeof post.id === 'number' &&
      typeof post.title === 'string' &&
      typeof post.userId === 'number'
    );
  }
  
  export { Post };