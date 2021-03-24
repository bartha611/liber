from rest_framework.generics import get_object_or_404


class MultipleFieldsLookupMixin(object):
    def get_object(self):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        filters = {}
        for field in self.lookup_fields:
            filters[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filters)
        self.check_object_permissions(self.request, obj)
        return obj
