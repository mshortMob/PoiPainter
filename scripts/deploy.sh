rm Archive.zip
git add -A
#git commit -a -m "$1"
#git push
zip Archive.zip *
aws --profile poipainter s3 sync '/Users/mshort/desktop/PoiPainter' s3://animmappertests
