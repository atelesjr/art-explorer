# 📊 Search Results Analysis: "Dali" Query

## Quick Summary

### 1. Search Endpoint Results

- **Total IDs returned:** ~500-800 objectIDs
- **API behavior:** Searches across multiple fields (artist, culture, title, tags)
- **Issue:** Returns items where "Dali" appears anywhere, not just in artist name

### 2. Detail Fetching & Validation (per page of 15 IDs)

| Stage                 | Count    | Notes                                         |
| --------------------- | -------- | --------------------------------------------- |
| IDs requested         | 15       | `PAGE_SIZE`                                   |
| Valid API responses   | 12-14    | Some return 404/incomplete data               |
| ✅ **With images**    | 8-11     | `primaryImageSmall` or `primaryImage` present |
| ❌ **Without images** | 3-5      | Empty/null image fields                       |
| **Rendered**          | **8-11** | After filtering                               |

### 3. Filtering Pipeline

```typescript
.filter(item => item.imageUrl) // Removes ~35-40% (no images)
```

**Optional artist filter (for user searches):**

```typescript
.filter(item =>
  item.imageUrl &&
  item.artist.toLowerCase().includes('dali')
) // Removes additional ~10-20% ("Unknown Artist")
```

### 4. Conversion Rates

| Metric                       | Rate        |
| ---------------------------- | ----------- |
| Valid API responses          | 85-90%      |
| Items with images            | 65-75%      |
| Items matching artist filter | 70-80%      |
| **Final render rate**        | **~50-60%** |

### 5. Example Console Output

```
Search Results: { total: 687, objectIDs: [...] }

Page 1 (15 IDs):
  With images: 11 items
  Without images: 4 items
  → Rendered: 11

Page 2 (15 IDs):
  With images: 9 items
  Without images: 6 items
  → Rendered: 9
```

### 6. Technical Decisions

✅ **Image filter:** Better UX (no empty placeholders)  
✅ **Artist filter:** Precision (removes false positives)  
✅ **Infinite pagination:** Performance (15 IDs at a time)  
✅ **`useInfiniteQuery`:** Automatic caching, retry, loading states

---

**Last updated:** October 26, 2025  
**Author:** Agostinho Teles Jr
