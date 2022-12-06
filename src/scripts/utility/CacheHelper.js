import CONFIG from '../global/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    /**
     * Membuat request kirim ke server dan menyimpan
     * response ke dalam cache
     * Parameter yang diterima bisa lebih dari satu
     * Jika salah satu request gagal maka semuanya tidak
     * akan disimpan di dalam cache
     */
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filterName) => caches.delete(filterName));
  },
  async _fetchRequest(request) {
    const response = await fetch(request);
    if (!response || response.status !== 200) {
      return response;
    }
    await this._addCache(request);
    return response;
  },
  async _addCache(request) {
    const cache = await this._openCache();
    /**
     * Membuat request kirim ke server dan responsenya 
     * disimpan ke dalam server
     */
    cache.add(request);
  },
  async revalidateCache(request) {
    /**
     * Mengambil dan mencari resource dari cache
     * Jika resource tidak ditemukan maka kembali undefined
     */
    const response = await caches.match(request);
    if (response) {
      this._fetchRequest(request);
      return response;
    }
    return this._fetchRequest(request);
  },
  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },
};
export default CacheHelper;
