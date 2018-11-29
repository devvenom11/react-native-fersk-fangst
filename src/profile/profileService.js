/** @module src/profile/profileService */

import Request from '../common/Request';

class ProfileService {
  get = id => new Request().get(`users/${id}`);

  update = id => new Request().put(`users/${id}`).header('Content-Type', 'multipart/form-data');

  delete = id => new Request().delete(`users/${id}`);

  changePassword = () => new Request().post('change');
}

export default new ProfileService();
