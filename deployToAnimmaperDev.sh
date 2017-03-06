rm Archive.zip
zip Archive.zip *
aws --profile poipainter s3 sync '/Users/mshort/desktop/PoiPainter' s3://animmappertests
git push
