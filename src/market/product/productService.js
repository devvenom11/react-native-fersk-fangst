import Request from '../../common/Request';

class ProductService {
  
  all = () => new Request().get('posts');

  get = id => new Request().get(`posts/${id}`);

  add = () => new Request().post('posts').header('Content-Type', 'multipart/form-data');

  update = id => new Request().put(`posts/${id}`).header('Content-Type', 'multipart/form-data');

  delete = id => new Request().delete(`posts/${id}`);

  toggleFavStatus = (...args) => new Request().post(`posts/${args[0]}/fav`).params({
    also: args.length > 1 ? args.slice(1) : null
  });
}

export default new ProductService();
