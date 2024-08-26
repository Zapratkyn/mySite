class MyProfileSerializer:
    def __init__(self, instance):
        self.instance = instance
    def data(self):
        return {
            "id" : self.instance.id,
            "name" : self.instance.user.username
        }